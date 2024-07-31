namespace Projet
{
   
       
        // Models/Answer.cs
        public class Answer
        {
            public int Id { get; set; }
            public int QuestionId { get; set; }
            public string Response { get; set; }
            public Question Question { get; set; }
        }
    
}
