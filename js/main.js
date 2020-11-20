'use strict'

const $addTask = document.querySelector('.add');
const $list = document.querySelector('.todos');
const $allDeleteBtn = document.getElementById('all-delete');
const $allResetBtn = document.getElementById('all-reset');


// 追加
(function () {
    // 初期化処理
    for (var key in localStorage) {
        var html = localStorage.getItem(key);
        if (html) {
            $list.innerHTML += localStorage.getItem(key);
        }
    }
})();

const saveTaskToLocalStorage = (task, html) => {
    if (html) {
        localStorage.setItem(task, html);
        return;
    }
    return;
}

const deleteTaskFromLocalStorage = task => {
    localStorage.removeItem(task);
    return;
}

const createTodoList = task => {

    const html = `
    <li class="list-group-item">
        <span class="task-name">${task}</span>
        <i class="far fa-trash-alt delete" title="削除する"></i>
    </li>
    `;

    $list.innerHTML += html;
    saveTaskToLocalStorage(task, html);
}

$addTask.addEventListener('submit', e => {

    e.preventDefault();

    const task = $addTask.add.value.trim();
    if (task.length) {
        createTodoList(task);
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
        console.log($list.children[0].textContent.trim());
        const task = e.target.parentElement.textContent.trim()
        deleteTaskFromLocalStorage(task);
    }
});

// リセット機能
$allResetBtn.addEventListener('click', () => {
    
    const $list = document.querySelector('.todos');
    const listLength = $list.children.length;

    for(let i = 0; i < listLength ; i++){
        $list.children[i].classList.remove('done');
    }

    location.reload();
});



