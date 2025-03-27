using Microsoft.EntityFrameworkCore;
using JobAppTracker.API.Models;

namespace JobAppTracker.API.Data
{
    public class JobApplicationContext : DbContext
    {
        public JobApplicationContext(DbContextOptions<JobApplicationContext> options)
            : base(options)
        {
        }

        public DbSet<JobAppTracker.API.Models.JobApplication> JobApplications { get; set; }
    }
}