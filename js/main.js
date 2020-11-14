'use strict'

const $addTask = document.querySelector('.add');
const $list = document.querySelector('.todos');
const $allDeleteBtn = document.getElementById('all-delete');
const $allResetBtn = document.getElementById('all-reset');


// ########## 追加 ###########
(function () {
    // 初期化処理
    // ローカルストレージに格納されている値を取得し、リストを生成する
    for (var key in localStorage) {
        var html = localStorage.getItem(key);
        if (html) {
            $list.innerHTML += localStorage.getItem(key);
        }
    }
})();

const saveTaskToLocalStorage = (task, html) => {
    // null は、localStorage に保存しない
    if (html) {
        // localStorage は、0 から始まる
        localStorage.setItem(task, html);
        return;
    }
    return;
}

const deleteTaskFromLocalStorage = task => {
    localStorage.removeItem(task);
    return;
}

// ###############################

const createTodoList = task => {
    // HTML テンプレートを生成
    const html = `
    <li class="list-group-item">
        <span class="task-name">${task}</span>
        <i class="far fa-trash-alt delete" title="削除する"></i>
    </li>
    `;

    $list.innerHTML += html;
    // ########## 追加 ###########
    saveTaskToLocalStorage(task, html);
}

$addTask.addEventListener('submit', e => {
    // デフォルトのイベントを無効
    e.preventDefault();

    // タスクに入力した値を空白を除外して格納
    const task = $addTask.add.value.trim();
    if (task.length) {
        // Todo List の HTML を作成
        createTodoList(task);
        // タスクに入力した文字をクリア
        $addTask.reset();
    }
});

// チェック機能
$list.addEventListener('click', e => {
    if (e.target.classList.contains('list-group-item')) {
        e.target.firstElementChild.classList.toggle('done')
    } else if (e.target.classList.contains('task-name')) {
        e.target.classList.toggle('done')
    }
});

// 削除機能
$list.addEventListener('click', e => {
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
        // ########## 削除 ###########
        console.log($list.children[0].textContent.trim());
        const task = e.target.parentElement.textContent.trim()
        deleteTaskFromLocalStorage(task);
    }
});

// 全てを削除機能(拡張中)
// $allDeleteBtn.addEventListener('click', () => {
    
//     const $list = document.querySelector('.todos');
//     const listLength = $list.children.length;

//     for(let i = 0; i < listLength ; i++){

//         $list.children[i].remove();
//         // ########## ストレージから削除 ###########
//         const task = $list.children[i].textContent.trim();
//         deleteTaskFromLocalStorage(task);

        
//     }    
// });

// リセット機能
$allResetBtn.addEventListener('click', () => {
    
    const $list = document.querySelector('.todos');
    const listLength = $list.children.length;

    for(let i = 0; i < listLength ; i++){
        $list.children[i].classList.remove('done');
    }

    location.reload();
});



