document.addEventListener('DOMContentLoaded', () => {
    const curtain = document.querySelector('.curtain-overlay');
    if (!curtain) return;

    // ロック開始
    document.body.classList.add('is-locked');

    // 1.2秒の滞在（タメ）の後にカーテンを開く
    setTimeout(() => {
        curtain.classList.add('is-opened');
    }, 1200);

    // 演出終了後にロック解除とクリーンアップ（1.2s + 2.5s = 3.7s）
    setTimeout(() => {
        document.body.classList.remove('is-locked');
        
        // 消えきるまで待ってからDOMから削除
        setTimeout(() => {
            curtain.style.display = 'none';
        }, 2500);
    }, 3700);
});
