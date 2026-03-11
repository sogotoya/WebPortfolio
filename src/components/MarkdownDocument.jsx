import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';

/**
 * MarkdownチE��ストを簡易パースして、スタイル付きのHTML要素を返す
 */
const parseMarkdown = (text) => {
    const lines = text.split('\n');
    const elements = [];
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];

        // h1
        if (line.startsWith('# ')) {
            elements.push(
                <h1 key={i} className="text-lg font-bold text-gray-100 mb-3 mt-2 border-b border-gray-600 pb-2">
                    {parseInline(line.slice(2))}
                </h1>
            );
        }
        // h2
        else if (line.startsWith('## ')) {
            elements.push(
                <h2 key={i} className="text-base font-bold text-gray-200 mb-2 mt-4">
                    {parseInline(line.slice(3))}
                </h2>
            );
        }
        // h3
        else if (line.startsWith('### ')) {
            elements.push(
                <h3 key={i} className="text-sm font-bold text-gray-300 mb-1 mt-3">
                    {parseInline(line.slice(4))}
                </h3>
            );
        }
        // リスト頁E��
        else if (line.match(/^\* /)) {
            const listItems = [];
            while (i < lines.length && lines[i].match(/^\* /)) {
                listItems.push(
                    <li key={i} className="text-gray-400 text-sm leading-relaxed">
                        {parseInline(lines[i].slice(2))}
                    </li>
                );
                i++;
            }
            elements.push(
                <ul key={`ul-${i}`} className="list-disc list-inside space-y-1 mb-2 ml-2">
                    {listItems}
                </ul>
            );
            continue;
        }
        // 空衁E
        else if (line.trim() === '') {
            // skip
        }
        // 通常チE��スチE
        else {
            elements.push(
                <p key={i} className="text-gray-400 text-sm leading-relaxed mb-2">
                    {parseInline(line)}
                </p>
            );
        }

        i++;
    }

    return elements;
};

/**
 * インラインMarkdown�E�E*bold**, `code`�E�を処琁E��めE
 */
const parseInline = (text) => {
    // **bold** と `code` をパース
    const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
    return parts.map((part, idx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={idx} className="text-gray-200 font-semibold">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('`') && part.endsWith('`')) {
            return <code key={idx} className="text-xs bg-gray-900 text-gray-300 px-1 py-0.5 rounded font-mono">{part.slice(1, -1)}</code>;
        }
        return part;
    });
};

/**
 * MarkdownDocument
 * GitHubのREADMEのような「書類」スタイルでMarkdownを表示するコンポ�EネンチE
 */
const MarkdownDocument = ({ url, tag = "Provided by School", tagEn = "Base Environment" }) => {
    const [content, setContent] = useState(null);
    const [error, setError] = useState(false);
    const [prevUrl, setPrevUrl] = useState(url);

    if (url !== prevUrl) {
        setPrevUrl(url);
        setContent(null);
        setError(false);
    }

    useEffect(() => {
        if (!url) return;

        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error('Failed to load');
                return res.text();
            })
            .then(setContent)
            .catch(() => setError(true));
    }, [url]);

    if (error || !url) return null;
    if (content === null) {
        return (
            <div className="mt-8 p-4 border-l-4 border-gray-600 bg-[#222] text-gray-500 text-sm animate-pulse">
                Loading document...
            </div>
        );
    }

    return (
        <div className="mt-8">
            {/* ヘッダー */}
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <FileText size={14} />
                    <span className="font-mono">{url ? url.split('/').pop() : 'document.md'}</span>
                </div>
                <div className="flex gap-2">
                    <span className="text-xs text-gray-600 bg-gray-800 border border-gray-700 px-2 py-0.5 rounded-sm">
                        {tag}
                    </span>
                    <span className="text-xs text-gray-600 bg-gray-800 border border-gray-700 px-2 py-0.5 rounded-sm">
                        {tagEn}
                    </span>
                </div>
            </div>

            {/* 本斁E��引用ライン付きドキュメンチE*/}
            <div
                style={{ backgroundColor: '#1e1e1e' }}
                className="border border-gray-700 border-l-4 border-l-gray-500 p-5 font-mono"
            >
                {parseMarkdown(content)}
            </div>
        </div>
    );
};

export default MarkdownDocument;
