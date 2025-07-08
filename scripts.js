/**
 * クラシックブロックの初期フォーカスを防止するスクリプト
 *
 * @version 0.1.0
 * @author miral_kashiwagi
 */

// wp.domReadyで実行
wp.domReady(() => {
    // 初期ロード時だけフォーカスを防止するフラグ
    let isInitialLoad = true;

    // フォーカス防止関数
    const preventFocus = () => {

        // Gutenbergの選択を解除
        if (wp.data && wp.data.dispatch) {
            wp.data.dispatch('core/block-editor').clearSelectedBlock();
            // console.log("clearSelectedBlock");
        }
    };

    // 初期ロード時のGutenbergブロック選択を監視
    const checkInitialSelection = () => {
        if (!isInitialLoad) return;

        const selectedBlock = wp.data.select('core/block-editor')?.getSelectedBlock();

        if (selectedBlock && 
            (selectedBlock.name === 'core/freeform' || 
             selectedBlock.name === 'tadv/classic-paragraph')) {
            preventFocus();
        }
    };

    // ブロック選択の監視を設定
    if (wp.data && wp.data.subscribe) {
        wp.data.subscribe(() => {
            if (isInitialLoad) {
                checkInitialSelection();
            }
        });
    }

    // 初期チェックを実行
    setTimeout(checkInitialSelection, 0);

    // 一定時間後に初期ロードフラグをオフにする
    setTimeout(() => {
        isInitialLoad = false;
        // console.log('初期ロードフラグをオフ: ユーザー操作によるフォーカスを許可');
    }, 1000);
});