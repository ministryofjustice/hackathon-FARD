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

    // Duck Category: Handles both single checkbox value and an array of values
    body('duckCategory')
        .custom((value) => {
            // Handle the case when a single checkbox is selected (string)
            if (typeof value === 'string' && value.trim() !== '') {
                return true;
            }

            // Handle the case when multiple checkboxes are selected (array)
            if (Array.isArray(value) && value.length > 0) {
                return value.every(item => typeof item === 'string' && item.trim() !== '');
            }

            // If none of the above, validation fails
            return false;
        })
        .withMessage('Duck category must contain one or more valid selections.'),
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
