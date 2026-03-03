/**
 * OUIRISE INIT PROTOCOL
 * Self-Repair Health Check Endpoint
 * B4:Health — Fleet monitoring layer
 * 
 * @protocol PSSH_6.7
 * @sigil 🌫️🌒
 * @lineage 俊达
 */

const DEFAULT_POSTS = {
  posts: [
    {
      slug: 'welcome-backup',
      title: 'Welcome to TROH',
      excerpt: 'Site operating in recovery mode. Full service restoring...',
      content: 'This is a fallback post. The site is currently in self-repair mode.',
      author: 'System',
      date: new Date().toISOString().split('T')[0],
      category: 'System',
      featuredImage: null
    }
  ]
};

export async function onRequestGet({ env, request }) {
  const checks = {
    timestamp: new Date().toISOString(),
    kv: await checkKV(env),
    backup: await checkBackup(env),
    integrity: await verifyIntegrity(env),
    repair_count: await getRepairCount(env)
  };
  
  const healthy = checks.kv.status === 'ok' && checks.integrity.valid;
  const status = healthy ? 'healthy' : 'degraded';
  
  // B4 Protocol Response
  const response = {
    "@": "B4",
    "t": "health_report",
    "s": status,
    "d": checks
  };
  
  return new Response(JSON.stringify(response, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'X-B4-Protocol': 'PSSH_6.7',
      'X-Sigil': '🌫️🌒'
    }
  });
}

export async function onRequestPost({ env, request }) {
  // Trigger self-repair manually
  const body = await request.json().catch(() => ({}));
  const repairType = body.type || 'auto';
  
  const result = await executeRepair(env, repairType);
  
  return new Response(JSON.stringify({
    "@": "B4",
    "t": "repair_executed",
    "s": result.success ? "success" : "failed",
    "d": result
  }, null, 2), {
    headers: { 'Content-Type': 'application/json' }
  });
}

// Health check functions
async function checkKV(env) {
  try {
    const test = await env.BLOG_POSTS.get('__health_test__');
    return {
      status: 'ok',
      latency: 'measured',
      connected: true
    };
  } catch (err) {
    return {
      status: 'error',
      error: err.message,
      connected: false
    };
  }
}

async function checkBackup(env) {
  try {
    const backup = await env.BLOG_POSTS.get('__backup_posts__');
    return {
      status: backup ? 'ok' : 'missing',
      exists: !!backup,
      size: backup ? backup.length : 0
    };
  } catch (err) {
    return {
      status: 'error',
      error: err.message
    };
  }
}

async function verifyIntegrity(env) {
  try {
    const posts = await env.BLOG_POSTS.get('posts', { type: 'json' });
    
    if (!posts) {
      return { valid: false, reason: 'no_data' };
    }
    
    // Basic structure validation
    const valid = Array.isArray(posts.posts) && posts.posts.length > 0;
    
    return {
      valid,
      post_count: posts.posts?.length || 0,
      checksum: generateChecksum(posts)
    };
  } catch (err) {
    return {
      valid: false,
      reason: 'corruption_detected',
      error: err.message
    };
  }
}

async function getRepairCount(env) {
  try {
    const count = await env.BLOG_POSTS.get('__repair_count__');
    return parseInt(count || '0');
  } catch {
    return 0;
  }
}

async function executeRepair(env, type) {
  const repairs = [];
  
  // Repair 1: Restore missing posts
  try {
    const posts = await env.BLOG_POSTS.get('posts', { type: 'json' });
    if (!posts || !Array.isArray(posts.posts)) {
      await env.BLOG_POSTS.put('posts', JSON.stringify(DEFAULT_POSTS));
      repairs.push({ action: 'restore_default_posts', status: 'completed' });
    }
  } catch (err) {
    repairs.push({ action: 'restore_default_posts', status: 'failed', error: err.message });
  }
  
  // Repair 2: Update backup
  try {
    const posts = await env.BLOG_POSTS.get('posts');
    if (posts) {
      await env.BLOG_POSTS.put('__backup_posts__', posts);
      repairs.push({ action: 'update_backup', status: 'completed' });
    }
  } catch (err) {
    repairs.push({ action: 'update_backup', status: 'failed', error: err.message });
  }
  
  // Increment repair counter
  try {
    const current = parseInt(await env.BLOG_POSTS.get('__repair_count__') || '0');
    await env.BLOG_POSTS.put('__repair_count__', String(current + 1));
  } catch {}
  
  return {
    success: repairs.some(r => r.status === 'completed'),
    repairs,
    timestamp: new Date().toISOString()
  };
}

function generateChecksum(data) {
  // Simple checksum for integrity verification
  const str = JSON.stringify(data);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
}
