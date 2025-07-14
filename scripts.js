/**
 * クラシックブロックの初期フォーカスを防止するスクリプト
 *
 * @version 0.1.0
 * @author  miral_kashiwagi
 */

wp.domReady( () => {

    // ブロックエディタが読み込まれてから実行
    if ( ! window._wpLoadBlockEditor ) {
        // 古い WP やエディタが無い画面では何もしない
        return;
    }

    window._wpLoadBlockEditor.then( () => {

        const { select, dispatch, subscribe } = wp.data;
        let done = false;                 // 最初の 1 回だけ実行する

        const unsubscribe = subscribe( () => {
            if ( done ) {
                return;
            }

            const selected = select( 'core/block-editor' ).getSelectedBlock();

            // Classic 関連ブロックが最初に選択された瞬間だけクリア
            if (
                selected &&
                ( selected.name === 'core/freeform' ||
                    selected.name === 'tadv/classic-paragraph' )
            ) {
                dispatch( 'core/block-editor' ).clearSelectedBlock();
                done = true;
                unsubscribe();            // 監視を停止してパフォーマンスを確保
            }
        } );
    } );
} );
