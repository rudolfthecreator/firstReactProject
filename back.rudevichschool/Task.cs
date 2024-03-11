using System;
using System.Collections.Generic;

namespace back.rudevichschool;

public partial class Task
{
    public int TaskId { get; set; }

    public string Title { get; set; } = null!;

    public string Body { get; set; } = null!;

    public short Priority { get; set; }

    public bool Done { get; set; }
}
