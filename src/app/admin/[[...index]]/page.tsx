"use client"

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function StudioPage() {
    return (
        <div className="sanity-admin" style={{ display: "contents" }}>
            <NextStudio config={config} />
        </div>
    )
}
