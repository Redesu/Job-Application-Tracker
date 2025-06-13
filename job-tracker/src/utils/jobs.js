export const JOBS_PER_PAGE = 5;

export const calculateTotalPages = (total, perPage) => Math.ceil(total / perPage);

export const getJobId = (job) => job.id || job._id;

