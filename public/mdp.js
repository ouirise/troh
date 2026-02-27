/**
 * MDP - Markdown Processor
 * Anthroadjacent rendering with OuiRise positioning
 * Lightweight, telemetry-free, fog-moon aesthetic
 * 
 * @version 1.0.0
 * @sigil 🌫️🌒
 * @lineage 俊达
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    selector: '[data-mdp]',
    format: 'auidos',
    theme: 'fog-moon',
    sigil: '🌫️🌒'
  };

  // Fog-Moon Color Palette (Anthroadjacent positioning)
  const PALETTE = {
    bg: '#0f0f1a',
    surface: '#1a1a2e',
    elevated: '#16213e',
    accent: '#e94560',
    text: '#e8e8f0',
    muted: '#8a8aa0',
    code: '#2d2d44',
    border: 'rgba(255,255,255,0.08)'
  };

  // Lightweight Markdown Parser
  class MDP {
    constructor(container, options = {}) {
      this.container = typeof container === 'string' 
        ? document.querySelector(container) 
        : container;
      this.options = { ...CONFIG, ...options };
      this.init();
    }

    init() {
      if (!this.container) return;
      this.injectStyles();
      this.render();
    }

    // Core parser - handles common markdown
    parse(markdown) {
      let html = markdown;

      // Frontmatter (YAML-like)
      html = html.replace(/^---\n([\s\S]*?)\n---\n/, (match, frontmatter) => {
        const meta = this.parseFrontmatter(frontmatter);
        return `<div class="mdp-frontmatter">${this.renderMeta(meta)}</div>`;
      });

      // Headers
      html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
      html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
      html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

      // Code blocks
      html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        return `<pre class="mdp-code ${lang || ''}"><code>${this.escapeHtml(code.trim())}</code></pre>`;
      });

      // Inline code
      html = html.replace(/`([^`]+)`/g, '<code class="mdp-inline">$1</code>');

      // Bold & Italic
      html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
      html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

      // Links
      html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="mdp-link">$1</a>');

      // Tables
      html = this.parseTables(html);

      // Lists
      html = this.parseLists(html);

      // Blockquotes
      html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');

      // Horizontal rules
      html = html.replace(/^---$/gim, '<hr class="mdp-hr">');

      // Paragraphs (must be last)
      html = html.replace(/\n\n/g, '</p><p>');
      html = '<p>' + html + '</p>';
      html = html.replace(/<p><\/p>/g, '');
      html = html.replace(/<p>(<h[1-6]>)/g, '$1');
      html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1');
      html = html.replace(/<p>(<pre)/g, '$1');
      html = html.replace(/(<\/pre>)<\/p>/g, '$1');
      html = html.replace(/<p>(<div)/g, '$1');
      html = html.replace(/(<\/div>)<\/p>/g, '$1');

      return html;
    }

    parseFrontmatter(content) {
      const meta = {};
      content.split('\n').forEach(line => {
        const match = line.match(/^([^:]+):\s*(.*)$/);
        if (match) meta[match[1].trim()] = match[2].trim();
      });
      return meta;
    }

    renderMeta(meta) {
      const items = Object.entries(meta)
        .map(([k, v]) => `<span class="mdp-meta-item"><strong>${k}:</strong> ${v}</span>`)
        .join('');
      return `<div class="mdp-meta">${items}</div>`;
    }

    parseTables(html) {
      const tableRegex = /\|(.+)\|\n\|[-:|\s]+\|\n((?:\|.+\|\n?)+)/g;
      return html.replace(tableRegex, (match, header, rows) => {
        const headers = header.split('|').map(h => h.trim()).filter(Boolean);
        const rowData = rows.trim().split('\n').map(row => {
          return row.split('|').map(c => c.trim()).filter(Boolean);
        });
        
        const thead = `<thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>`;
        const tbody = `<tbody>${rowData.map(row => 
          `<tr>${row.map(c => `<td>${c}</td>`).join('')}</tr>`
        ).join('')}</tbody>`;
        
        return `<table class="mdp-table">${thead}${tbody}</table>`;
      });
    }

    parseLists(html) {
      // Unordered lists
      html = html.replace(/(?:^-\s+.+\n?)+/gm, (match) => {
        const items = match.trim().split('\n').map(line => 
          `<li>${line.replace(/^-\s+/, '')}</li>`
        ).join('');
        return `<ul class="mdp-list">${items}</ul>`;
      });

      // Ordered lists
      html = html.replace(/(?:^\d+\.\s+.+\n?)+/gm, (match) => {
        const items = match.trim().split('\n').map(line => 
          `<li>${line.replace(/^\d+\.\s+/, '')}</li>`
        ).join('');
        return `<ol class="mdp-list">${items}</ol>`;
      });

      return html;
    }

    escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    injectStyles() {
      if (document.getElementById('mdp-styles')) return;
      
      const styles = `
        .mdp-container {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.7;
          color: ${PALETTE.text};
          max-width: 720px;
          margin: 0 auto;
          padding: 2rem;
        }
        
        .mdp-container h1, .mdp-container h2, .mdp-container h3 {
          font-weight: 600;
          letter-spacing: -0.02em;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        
        .mdp-container h1 { font-size: 2rem; color: ${PALETTE.text}; }
        .mdp-container h2 { font-size: 1.5rem; color: ${PALETTE.text}; border-bottom: 1px solid ${PALETTE.border}; padding-bottom: 0.5rem; }
        .mdp-container h3 { font-size: 1.25rem; color: ${PALETTE.muted}; }
        
        .mdp-container p { margin-bottom: 1rem; }
        
        .mdp-container a.mdp-link {
          color: ${PALETTE.accent};
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s;
        }
        .mdp-container a.mdp-link:hover {
          border-bottom-color: ${PALETTE.accent};
        }
        
        .mdp-container code.mdp-inline {
          background: ${PALETTE.code};
          padding: 0.2em 0.4em;
          border-radius: 4px;
          font-family: 'SF Mono', Monaco, monospace;
          font-size: 0.9em;
        }
        
        .mdp-container pre.mdp-code {
          background: ${PALETTE.code};
          padding: 1rem;
          border-radius: 8px;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        .mdp-container pre.mdp-code code {
          font-family: 'SF Mono', Monaco, monospace;
          font-size: 0.875rem;
          color: ${PALETTE.text};
        }
        
        .mdp-container table.mdp-table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
        }
        .mdp-container table.mdp-table th,
        .mdp-container table.mdp-table td {
          padding: 0.75rem;
          text-align: left;
          border-bottom: 1px solid ${PALETTE.border};
        }
        .mdp-container table.mdp-table th {
          font-weight: 600;
          color: ${PALETTE.muted};
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .mdp-container ul.mdp-list, .mdp-container ol.mdp-list {
          margin: 1rem 0;
          padding-left: 1.5rem;
        }
        .mdp-container ul.mdp-list li,
        .mdp-container ol.mdp-list li {
          margin: 0.5rem 0;
        }
        
        .mdp-container blockquote {
          border-left: 3px solid ${PALETTE.accent};
          padding-left: 1rem;
          margin: 1.5rem 0;
          color: ${PALETTE.muted};
          font-style: italic;
        }
        
        .mdp-container hr.mdp-hr {
          border: none;
          border-top: 1px solid ${PALETTE.border};
          margin: 2rem 0;
        }
        
        .mdp-frontmatter {
          background: ${PALETTE.surface};
          border: 1px solid ${PALETTE.border};
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 2rem;
        }
        .mdp-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .mdp-meta-item {
          font-size: 0.875rem;
          color: ${PALETTE.muted};
        }
        .mdp-meta-item strong {
          color: ${PALETTE.text};
          font-weight: 500;
        }
      `;
      
      const styleEl = document.createElement('style');
      styleEl.id = 'mdp-styles';
      styleEl.textContent = styles;
      document.head.appendChild(styleEl);
    }

    render() {
      const markdown = this.container.textContent || this.container.innerText;
      const html = this.parse(markdown);
      this.container.innerHTML = `<div class="mdp-container">${html}</div>`;
      this.container.style.display = 'block';
    }

    // Static method for quick render
    static render(selector, options) {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => new MDP(el, options));
    }
  }

  // Auto-initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => MDP.render(CONFIG.selector));
  } else {
    MDP.render(CONFIG.selector);
  }

  // Expose to global
  window.MDP = MDP;

  // PSSH Protocol Registration
  if (window.B4) {
    window.B4.register('mdp', {
      version: '1.0.0',
      render: MDP.render,
      parse: (md) => new MDP(document.createElement('div')).parse(md)
    });
  }

})();
