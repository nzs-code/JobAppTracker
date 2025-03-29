using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using JobAppTracker.API.Models;
using JobAppTracker.API.Models.Enums;

namespace JobAppTracker.API.Repositories
{
    public interface IJobApplicationRepository
    {
        Task<IEnumerable<JobApplication>> GetAllAsync();
        Task<JobApplication> GetByIdAsync(Guid id);
        Task AddAsync(JobApplication jobApplication);
        Task UpdateApplicationStatusAsync(Guid id, ApplicationStatus newStatus);
        Task<bool> DeleteAsync(JobApplication jobApplication);
        Task<bool> ExistsAsync(Guid id);
    }
}
