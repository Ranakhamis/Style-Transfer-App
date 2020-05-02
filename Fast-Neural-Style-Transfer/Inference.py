from models import TransformerNet
from utils import *
import torch
from torch.autograd import Variable
import argparse
import os
import tqdm
from torchvision.utils import save_image
from PIL import Image
import base64
from io import BytesIO



class Inference():
    """
    Inference class that wrapped styleTransfer classes.  
    """

    def __init__(self):
        self.device = torch.device(
            "cuda" if torch.cuda.is_available() else "cpu")

        self.mosaic_WeightsPath = "/home/mohamed/stylrTrans/Fast-Neural-Style-Transfer/weights/mosaic_10000.pth"
        self.cuphead_WeightsPath = "/home/mohamed/stylrTrans/Fast-Neural-Style-Transfer/weights/cuphead_10000.pth"
        self.starry_night_WeightsPath = "/home/mohamed/stylrTrans/Fast-Neural-Style-Transfer/weights/starry_night_10000.pth"

        # instance of style Transfer model.
        self.transformer = TransformerNet().to(self.device)
        self.transform = style_transform()

    def load_model(self, modelType):
        """
        Args:
            modelType: string that contains name of the model to switch to it.
        """
        if modelType.lower() == "mosaic":
            self.transformer.load_state_dict(torch.load(
                self.mosaic_WeightsPath, map_location=torch.device('cpu')))
        elif modelType.lower() == "cuphead":
            self.transformer.load_state_dict(torch.load(
                self.cuphead_WeightsPath, map_location=torch.device('cpu')))
        else:
            self.transformer.load_state_dict(torch.load(
                self.starry_night_WeightsPath, map_location=torch.device('cpu')))

        self.transformer.eval()

    def predict(self, modelType, Base64Img):
        img = base64.b64decode(Base64Img)
        image = Image.open(BytesIO(img)).convert('RGB')
        self.load_model(modelType)
        
        image_tensor = Variable(self.transform(image)).to(self.device)
        image_tensor = image_tensor.unsqueeze(0)

        # Stylize image
        with torch.no_grad():
            stylized_image = denormalize(self.transformer(image_tensor)).cpu()
        resultPath = save_image(
            stylized_image, "/home/mohamed/stylrTrans/Fast-Neural-Style-Transfer/images/outputs/result.jpeg")

        with open(resultPath, "rb") as img_file:
            my_string = base64.b64encode(img_file.read())

        return my_string    


