import { Request, Response } from "express";
import { TrainerService } from "./trainer.service";

const createTrainer = async (req: Request, res: Response) => {
  try {
    let { ...trainerData } = req.body;
    const result = await TrainerService.createTrainer(trainerData);
    res.status(200).json({
      message: "Trainer created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Trainer creation failed!",
    });
  }
};

export const TrainerController = {
  createTrainer,
};
