document.addEventListener('DOMContentLoaded', () => {
    const curtain = document.querySelector('.curtain-overlay');
    if (!curtain) return;

    // ロック開始
    document.body.classList.add('is-locked');

    // わずかな遅延の後にカーテンを開く（ブラウザのレンダリング待ち）
    setTimeout(() => {
        curtain.classList.add('is-opened');
    }, 100);

    // 0.8秒後にロック解除と要素のクリーンアップ
    setTimeout(() => {
        document.body.classList.remove('is-locked');
        
        // アニメーション完了後にDOMから削除（パフォーマンスのため）
        setTimeout(() => {
            curtain.style.display = 'none';
        }, 800);
    }, 800);
});
