/* eslint-disable  */
import { mergeAttributes, Node, nodePasteRule } from '@tiptap/core'

import {
    getEmbedUrlFromYoutubeUrl,
    isValidYoutubeUrl,
    YOUTUBE_REGEX_GLOBAL,
} from './utils'

export const Youtube = Node.create({
    name: 'youtube',

    addOptions() {
        return {
            addPasteHandler: true,
            allowFullscreen: true,
            autoplay: false,
            ccLanguage: undefined,
            ccLoadPolicy: undefined,
            controls: true,
            disableKBcontrols: false,
            enableIFrameApi: false,
            endTime: 0,
            height: 480,
            interfaceLanguage: undefined,
            ivLoadPolicy: 0,
            loop: false,
            modestBranding: false,
            HTMLAttributes: {},
            inline: false,
            nocookie: false,
            origin: '',
            playlist: '',
            progressBarColor: undefined,
            width: 1080,
        }
    },

    inline() {
        return this.options.inline
    },

    group() {
        return this.options.inline ? 'inline' : 'block'
    },

    content: 'inline*',
    atom: true,
    draggable: true,

    isolating: true,

    addAttributes() {
        return {
            src: {
                default: null,
            },
            start: {
                default: 0,
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'figure[data-youtube-video]',
            },
        ]
    },

    addCommands() {
        return {
            setYoutubeVideo: options => ({ commands }) => {
                if (!isValidYoutubeUrl(options.src)) {
                    return false
                }

                return commands.insertContent({
                    type: this.name,
                    attrs: options,
                })
            },
        }
    },

    addPasteRules() {
        if (!this.options.addPasteHandler) {
            return []
        }

        return [
            nodePasteRule({
                find: YOUTUBE_REGEX_GLOBAL,
                type: this.type,
                getAttributes: match => ({ src: match.input }),
            }),
        ]
    },

    renderHTML({ HTMLAttributes }) {
        const clickHandler = "window.open('https://www.youtube.com/', '_blank')";
        const onClickAttribute = clickHandler;

        const embedUrl = getEmbedUrlFromYoutubeUrl({
            url: HTMLAttributes.src,
            allowFullscreen: this.options.allowFullscreen,
            autoplay: this.options.autoplay,
            ccLanguage: this.options.ccLanguage,
            ccLoadPolicy: this.options.ccLoadPolicy,
            controls: this.options.controls,
            disableKBcontrols: this.options.disableKBcontrols,
            enableIFrameApi: this.options.enableIFrameApi,
            endTime: this.options.endTime,
            interfaceLanguage: this.options.interfaceLanguage,
            ivLoadPolicy: this.options.ivLoadPolicy,
            loop: this.options.loop,
            modestBranding: this.options.modestBranding,
            nocookie: this.options.nocookie,
            origin: this.options.origin,
            playlist: this.options.playlist,
            progressBarColor: this.options.progressBarColor,
            startAt: HTMLAttributes.start || 0,
        })

        const blockWidth = HTMLAttributes['data-block-width']
        HTMLAttributes['data-block-width'] = null
        HTMLAttributes.src = embedUrl
        console.log('att: ', HTMLAttributes)

        if (embedUrl !== null)
            return [
                'figure',
                {
                    'data-youtube-video': '',
                    'data-block-width': blockWidth,
                    class: ' pb-4 text-center cursor-grab',
                },
                [
                    'iframe',
                    mergeAttributes(
                        this.options.HTMLAttributes,
                        {
                            class: 'youtube-embed',
                            contenteditable: false,
                            draggable: false,
                            width: this.options.width,
                            height: this.options.height,
                            allowfullscreen: this.options.allowFullscreen,
                            autoplay: this.options.autoplay,
                            ccLanguage: this.options.ccLanguage,
                            ccLoadPolicy: this.options.ccLoadPolicy,
                            disableKBcontrols: this.options.disableKBcontrols,
                            enableIFrameApi: this.options.enableIFrameApi,
                            endTime: this.options.endTime,
                            interfaceLanguage: this.options.interfaceLanguage,
                            ivLoadPolicy: this.options.ivLoadPolicy,
                            loop: this.options.loop,
                            modestBranding: this.options.modestBranding,
                            origin: this.options.origin,
                            playlist: this.options.playlist,
                            progressBarColor: this.options.progressBarColor,
                        },
                        HTMLAttributes,
                    ),
                ],
                ['div', 0]
            ]
        else return [
            'div',
            {
                class: 'bookmark',

            },
            [
                'div',
                { class: 'bookmark-content flex', onclick: onClickAttribute },
                [
                    'img',
                    mergeAttributes({ class: 'bookmark-thumbnail', src: 'https://ultimagz.com/wp-content/uploads/YTLogo_old_new_1680.gif' })
                ],
                [
                    'div',
                    { class: 'bookmark-desc ' },
                    [
                        'h3',
                        { class: 'bookmark-title' },
                        'YouTube',
                    ],
                    [
                        'div',
                        { class: 'bookmark-link' },
                        'https://www.youtube.com/',
                    ]
                ]
            ],
            ['div', 0]
        ]
    },
})
