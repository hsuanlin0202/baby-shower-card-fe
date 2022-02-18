export interface BabyCardTypes {
  id: number;
  // title: string;
  description: string;
  commentActive: boolean;
  like: number;
  fatherName: string;
  motherName: string;
  babyName: string;
  babyBirthday: string;
  public: boolean;
  photo: string;
  // messages: BabyCardMessagesTypes;
  template: BabyCardTemplateTypes;
  active: boolean; // from order
  expiredAt: string;
}

export interface BabyCardMessagesTypes {}

export interface BabyCardTemplateTypes {
  textColor: string;
  background: string;
  logo: string;
  partner: string;
}
