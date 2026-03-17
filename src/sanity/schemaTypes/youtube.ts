import { PlayIcon } from 'lucide-react'

export default {
    name: 'youtube',
    type: 'object',
    title: 'Video / YouTube Embed',
    icon: PlayIcon,
    fields: [
        {
            name: 'videoType',
            title: 'Video Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Video URL (YouTube/Vimeo)', value: 'url' },
                    { title: 'HTML Embed Code', value: 'html' },
                ],
                layout: 'radio',
            },
            initialValue: 'url',
        },
        {
            name: 'url',
            type: 'url',
            title: 'Video URL',
            description: 'Paste the video URL (e.g., https://www.youtube.com/watch?v=...)',
        },
        {
            name: 'html',
            type: 'text',
            title: 'HTML Embed Code',
            description: 'Paste the <iframe> embed code here (if you chose HTML Embed Code)',
            rows: 5,
        },
    ],
    preview: {
        select: {
            url: 'url',
            videoType: 'videoType',
        },
        prepare({ url, videoType }: { url?: string, videoType?: string }) {
            return {
                title: videoType === 'html' ? 'Custom HTML Embed' : 'YouTube/Vimeo Video',
                subtitle: url || 'No URL provided',
            }
        },
    },
}
