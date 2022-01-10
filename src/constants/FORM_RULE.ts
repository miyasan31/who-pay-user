export const REQUIRE = {
  required: {
    value: true,
    message: "必須入力項目です",
  },
};

export const PHONE_RULE = {
  required: {
    value: true,
    message: "必須入力項目です",
  },
  minLength: {
    value: 11,
    message: "11桁で入力してください",
  },
  maxLength: {
    value: 11,
    message: "6桁の認証コードを入力してください",
  },
};

export const EMAIL_RULE = {
  required: {
    value: true,
    message: "必須入力項目です",
  },
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "メールアドレスの形式が正しくありません",
  },
};

export const PASSWORD_RULE = {
  required: {
    value: true,
    message: "必須入力項目です",
  },
  minLength: {
    value: 8,
    message: "パスワードは8文字以上です",
  },
  pattern: {
    value: /^[a-zA-Z0-9]+$/,
    message: "パスワードは半角英数字です",
  },
};

export const VERIFY_RULE = {
  required: {
    value: true,
    message: "必須入力項目です",
  },
  minLength: {
    value: 6,
    message: "6桁の認証コードを入力してください",
  },
  maxLength: {
    value: 6,
    message: "6桁の認証コードを入力してください",
  },
};
