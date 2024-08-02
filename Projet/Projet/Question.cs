namespace Projet
{
    // Models/Question.cs
    public class Question
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string Type { get; set; } // e.g.,
        public List<string> Options { get; set; }

        public ICollection<Answer> Answers { get; set; }
    }
}
