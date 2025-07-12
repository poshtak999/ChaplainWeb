function Post1() {
  return (
    <div className="flex flex-col justify-center items-center p-5 sm:m-10 w-full">
      <div className="bg-white/10 backdrop-blur-md border-white/30 rounded-3xl shadow-2xl p-6 sm:p-10 w-full max-w-4xl">
        <h3 className="text-center text-3xl sm:text-5xl text-amber-50 font-bold mb-6 break-words">
          Що таке ПТСР: природа, симптоми, механізми
        </h3>

        <div className="space-y-6 text-amber-50 text-2xl sm:text-2xl leading-relaxed break-words whitespace-pre-line">
          <div>
            <strong>Короткий зміст:</strong> Посттравматичний стресовий розлад — це психічна реакція на надзвичайно
            травматичні події. Часто виникає в людей, які пережили бойові дії,
            поранення, втрату побратимів.
          </div>

          <div>
            <strong>Основні симптоми:</strong>
            <ul className="list-disc list-inside pl-4">
              <li>Флешбеки, нічні кошмари</li>
              <li>Тривожність, гіпернастороженість</li>
              <li>Уникнення нагадувань про травму</li>
              <li>Відчуття провини або відчуження</li>
              <li>Проблеми зі сном, агресивність</li>
            </ul>
          </div>

          <div>
            <strong>Причини:</strong>
            <ul className="list-disc list-inside pl-4">
              <li>Порушення роботи гіпокампу, мигдалеподібного тіла, кори</li>
              <li>Відсутність підтримки після травми</li>
              <li>Кумулятивний ефект повторних шоків</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post1;
