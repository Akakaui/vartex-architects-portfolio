export default {
    name: 'project',
    title: 'Project',
    type: 'document',
    groups: [
        {
            name: 'basic',
            title: 'Basic Info',
        },
        {
            name: 'specs',
            title: 'Specifications',
        },
    ],
    fields: [
        {
            name: 'title',
            title: 'Project Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'featured',
            title: 'Featured on Homepage',
            description: 'If toggled, this project will appear in the home page hero carousel.',
            type: 'boolean',
            initialValue: true,
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Residential', value: 'Residential' },
                    { title: 'Commercial', value: 'Commercial' },
                    { title: 'Institutional', value: 'Institutional' },
                    { title: 'Urban Planning', value: 'Urban' },
                    { title: 'Landscape', value: 'Landscape' },
                ],
            },
        },
        {
            name: 'client',
            title: 'Client',
            type: 'string',
            group: 'basic',
        },
        {
            name: 'location',
            title: 'Location',
            type: 'string',
            group: 'basic',
        },
        {
            name: 'year',
            title: 'Year',
            type: 'string',
            group: 'basic',
        },
        {
            name: 'area',
            title: 'Area / Size',
            type: 'string',
            group: 'basic',
        },
        {
            name: 'duration',
            title: 'Duration',
            type: 'string',
            group: 'specs',
        },
        {
            name: 'materiality',
            title: 'Materiality',
            type: 'string',
            group: 'specs',
        },
        {
            name: 'sustainability',
            title: 'Sustainability',
            type: 'string',
            group: 'specs',
        },
        {
            name: 'mainImage',
            title: 'Main Hero Image',
            description: 'The high-resolution image used in the homepage carousel.',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'gallery',
            title: 'Project Gallery',
            description: 'Drag and drop images to reorder them in the project detail view.',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
            options: {
                layout: 'grid',
            },
        },
        {
            name: 'description',
            title: 'Project Description',
            type: 'text',
            rows: 5,
        },
    ],
    preview: {
        select: {
            title: 'title',
            media: 'mainImage',
        },
    },
}
