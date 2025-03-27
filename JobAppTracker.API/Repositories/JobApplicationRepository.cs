using JobAppTracker.API.Repositories;
using JobAppTracker.API.Models;
using JobAppTracker.API.Data;
using Microsoft.EntityFrameworkCore;
using JobAppTracker.API.Models.Enums;

namespace JobAppTracker.API.Repositories {
    public class JobApplicationRepository : IJobApplicationRepository
    {
        private readonly JobApplicationContext _context;
        public JobApplicationRepository(JobApplicationContext context)
        {
            _context = context;
        }
        
        public async Task<IEnumerable<JobApplication>> GetAllAsync()
        {           
            return await _context.JobApplications.ToListAsync();
        }

        public async Task<JobApplication> GetByIdAsync(Guid id)
        {
            var application = await _context.JobApplications.FindAsync(id);
            if (application == null){
                // TODO 
                return null;
            }
            return application;            
        }

        public async Task AddAsync(JobApplication jobApplication){
            await _context.JobApplications.AddAsync(jobApplication);
            await _context.SaveChangesAsync();
        }
    }
}