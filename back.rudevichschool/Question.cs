using System;
using System.Collections.Generic;

namespace back.rudevichschool;

public partial class Question
{
    public int QId { get; set; }

    public string Quest { get; set; } = null!;

    public string Answer { get; set; } = null!;

    public int? Count { get; set; }
}
