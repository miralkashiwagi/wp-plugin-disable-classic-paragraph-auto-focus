<?php
/**
 * Plugin Name: Disable Classic Paragraph Auto Focus
 * Description: Advanced Editor Tools有効化時に発生するクラシック段落／クラシックブロックの初期フォーカスと選択を解除します。
 * Version:     0.1.0
 * Author:      miral_kashiwagi
 * License:     GPL-2.0-or-later
 */

// セキュリティ: 直接アクセスを防ぐ
if (!defined('ABSPATH')) {
    exit;
}

/**
 * プラグインのメインクラス
 */
class DisableClassicParagraphAutoFocus {

    /**
     * コンストラクタ
     */
    public function __construct() {
        add_action('enqueue_block_editor_assets', array($this, 'enqueue_block_editor_assets'));
    }

    /**
     * ブロックエディタ用のアセットを読み込む
     */
    public function enqueue_block_editor_assets() {
        // JavaScriptファイルのパスとURL
        $script_path = plugin_dir_path(__FILE__) . 'scripts.js';
        $script_url = plugin_dir_url(__FILE__) . 'scripts.js';

        // ファイルが存在するかチェック
        if (!file_exists($script_path)) {
            return;
        }

        // スクリプトを登録して読み込み
        wp_enqueue_script(
            'disable-classic-focus',
            $script_url,
            array('wp-blocks', 'wp-dom-ready', 'wp-edit-post'),
            filemtime($script_path),
            true
        );
    }
}

// プラグインを初期化
new DisableClassicParagraphAutoFocus();