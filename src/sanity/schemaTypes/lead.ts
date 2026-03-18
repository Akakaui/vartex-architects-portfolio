import { defineField, defineType } from 'sanity'
import { User } from 'lucide-react'

export default defineType({
    name: 'lead',
    title: 'Inquiries & Leads',
    type: 'document',
    icon: User,
    fields: [
        defineField({
            name: 'refNumber',
            title: 'Reference Number',
            type: 'string',
            readOnly: true,
        }),
        defineField({
            name: 'name',
            title: 'Full Name',
            type: 'string',
        }),
        defineField({
            name: 'email',
            title: 'Email Address',
            type: 'string',
        }),
        defineField({
            name: 'phone',
            title: 'Phone Number',
            type: 'string',
        }),
        defineField({
            name: 'type',
            title: 'Project Type',
            type: 'string',
        }),
        defineField({
            name: 'location',
            title: 'Site Location',
            type: 'string',
        }),
        defineField({
            name: 'brief',
            title: 'Project Brief',
            type: 'text',
        }),
        defineField({
            name: 'submittedAt',
            title: 'Submitted At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'type',
        },
    },
})
