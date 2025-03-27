using System;
using JobAppTracker.API.Models.Enums;

namespace JobAppTracker.API.Models
{
    
    public class JobApplication{

        public Guid Id { get; set; }

        public string CompanyName { get; set; } // TODO

        public string Position { get; set; } // TODO

        public ApplicationStatus Status { get; set; }

        public DateTime DateApplied { get; set; }
    } 
}