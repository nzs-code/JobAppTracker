using System;
using JobAppTracker.API.Models.Enums;

namespace JobAppTracker.API.Models
{
    
    public class JobApplication{

        public Guid Id { get; set; }

        public string CompanyName { get; set; } = string.Empty;

        public string Position { get; set; } = string.Empty;

        public ApplicationStatus Status { get; set; }

        public DateTime DateApplied { get; set; }
    } 
}