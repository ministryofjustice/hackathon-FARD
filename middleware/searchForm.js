// Validation Middleware
import { body, validationResult } from 'express-validator';

const validateUser = [
    // Name: Non-empty string
    body('name')
        .trim()
        .isString().withMessage('Name must be a string.')
        .not().isEmpty().withMessage('Name cannot be an empty string.'),

    // Location: Non-empty string
    body('location')
        .trim()
        .isString().withMessage('Location must be a string.')
        .not().isEmpty().withMessage('Location cannot be an empty string.'),

    // Tags: Non-empty array
    body('filters')
        .isArray({ min: 1 }).withMessage('Filters must be a non-empty array.')
        .custom((tags) => tags.every(tag => typeof tag === 'string' && tag.trim() !== ''))
        .withMessage('Filters must contain non-empty strings.'),

    // Error Handling Middleware
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().map(err => err.msg) });
        }
        next();
    }
];

export default validateUser;
