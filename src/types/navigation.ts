export interface MenuLink {
  id?: string;
  label: string;
  path: string;
}

export interface FooterSection {
  title: string;
  links: MenuLink[];
}

export interface LanguageOption {
  code: string;
  label: string;
  active?: boolean;
}
