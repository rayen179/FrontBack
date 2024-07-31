export interface IEmployee {
  id?: number;
  name: string;
  email: string;
  password: string;

}

export interface Question{
  id?: number;
  text: string;
  options: string[];
}

export interface Answer {
  id?: number;
  questionId: number;
  response:string;
  Question:Question
}
