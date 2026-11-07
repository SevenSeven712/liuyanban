
const fs = require('fs');
function inspect(file) {
    try {
        const c = fs.readFileSync(file, 'utf8');
        const lines = c.split('\n');
        console.log('=== ' + file + ' ===');
        console.log('Lines:', lines.length);
        console.log('First 5 lines:');
        console.log(lines.slice(0, 5).join('\n'));
        console.log('Tail 20 lines:');
        console.log(lines.slice(-20).join('\n'));
    } catch (e) {
        console.error(file, e.message);
    }
}
inspect('posts.html');
inspect('new-post.html');
