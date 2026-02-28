import { PlayIcon } from 'lucide-react'

export default {
    name: 'youtube',
    type: 'object',
    title: 'YouTube Embed',
    icon: PlayIcon,
    fields: [
        {
            name: 'url',
            type: 'url',
            title: 'YouTube video URL',
        },
    ],
    preview: {
        select: {
            url: 'url',
        },
    },
}
