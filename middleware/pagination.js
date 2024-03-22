

export const paginationMiddleware = () => {
    return (req, res, next) => {

        const pageNumber = parseInt(req.query.page) || 1; // Get the current page number from the query parameters
        const pageSize = parseInt(req.query.size) || 3;
        const startIndex = (pageNumber - 1) * pageSize;

        // Attach pagination data to the request object
        req.pagination = {
            page: pageNumber,
            limit: pageSize,
            startIndex,
            endIndex: pageSize
        };
        next(); // CAll the next middleware
    }
};