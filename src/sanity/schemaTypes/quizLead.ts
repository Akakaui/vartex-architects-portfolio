import { defineField, defineType } from 'sanity'
import { HelpCircle } from 'lucide-react'

export default defineType({
    name: 'quizLead',
    title: 'Quiz Leads',
    type: 'document',
    icon: HelpCircle,
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
            name: 'q1',
            title: 'Q1 / What are you planning?',
            type: 'string',
        }),
        defineField({
            name: 'q2',
            title: 'Q2 / What is the scale?',
            type: 'string',
        }),
        defineField({
            name: 'recommendedService',
            title: 'Recommended Service',
            type: 'string',
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
            subtitle: 'recommendedService',
        },
    },
})
