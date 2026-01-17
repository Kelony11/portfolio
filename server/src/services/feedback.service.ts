import { Feedback } from "../models/FeedbackSchema";

export const createFeedbackService = async (data :any   )=>{
  const result = await Feedback.create(data);
  return result;

}