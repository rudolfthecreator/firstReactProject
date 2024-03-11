using System;
using System.Collections.Generic;

namespace back.rudevichschool;

public partial class Question
{
    public int QuestionId { get; set; }

    public string Question1 { get; set; } = null!;

    public string Answer { get; set; } = null!;
}
