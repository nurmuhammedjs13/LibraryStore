namespace FOOTER {
  type GetFooterReaponse = [
    {
      logo: string;
      contact_info: [
        {
          contact_info: string;
        }
      ];
      futer_email: [
        {
          email_futer: string;
        }
      ];
      social_set: [
        {
          social_logo: string;
          social_set: string;
        }
      ];
      futer_address: [
        {
          address: string;
        }
      ];
    }
  ];
  type GetFooterRequest = void;
}
