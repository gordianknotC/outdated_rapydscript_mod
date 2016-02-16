RapydScript 改寫

所有學習python 的人或多或少都會得上一種病，學了 python 以後就覺得 python 是世界上最好的語言，即然這麼好，為什麼還要用其他的語言？於是 
python 有各種 不同版本的 implementation，這種現像到了 web 平台一樣出現，剛好當時的我也得了這種病，想寫 web 但不想離開 python， 那個
時代，JS 才剛有 module 概念，一堆 js transpiler 出現想解決類似的問題，我剛好也在那時開始玩起各種 py to js transpiler, 多數都不盡理想，
太過肥大，只有 Rapydscript 尚可， 於是加入 RapydScript 核心功能的改寫， RapydScritp 為 python 的近親實作，同樣繼承 python 效能的低落
尤其是 function call overhead 的特性， 當時引入 comment 注入 transpiler 指令 (pragma, 借用 nim-lang 的概念)， 以改變特定行／物件的 
transpiler 特性，好提升 RapydScript 呼叫 function 的效能，過程好玩但最後放棄，以 transpiler 的方式寫另一種語言實在有儲多不便，不如直接使用 js
