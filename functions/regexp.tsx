const moreThenEight = `(?=.{8,32})`;
const hasNumber = `(?=.*\\d)`;
const hasLowerCase = `(?=.*[a-z])`;
const hasUpperCase = `(?=.*[A-Z])`;
const hasSpecialCharacter = `(?=.*[!*$%])`;

const Password = RegExp(
  `${moreThenEight}(
	  ${hasNumber}${hasLowerCase}${hasUpperCase}|
	  ${hasNumber}${hasLowerCase}${hasSpecialCharacter}|
	  ${hasLowerCase}${hasUpperCase}${hasSpecialCharacter}
  ).*`.replace(/\s/g, "")
);

const Phone = RegExp(/^09\d{8}$/); // 台灣手機

const FlexibleTel = RegExp(/^[0-9]{10,20}$/);

const Email = RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const Number = RegExp(/^[0-9]*$/);

const HasValue = RegExp(/@"^(?=[^A-Za-z]*[A-Za-z])[\x00-\x7F]*$"/);

export const Rule = {
  Email,
  Phone,
  FlexibleTel,
  Password,
  Number,
  HasValue,
};
