import { Types } from 'mongoose';

export type IWorkoutModules = {
  modules: IModule[];
  workout: Types.ObjectId;
};
export type IModule = {
  module_name: string;
  module_time: string;
};
