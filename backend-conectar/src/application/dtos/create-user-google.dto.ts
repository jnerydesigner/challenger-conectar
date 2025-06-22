export interface CreateUserGoogleDTO {
  id: string;
  displayName: string;
  name: Name;
  emails: Email[];
  photos: Photo[];
  provider: string;
}

export interface Name {
  familyName: string;
  givenName: string;
}

export interface Email {
  value: string;
  verified: boolean;
}

export interface Photo {
  value: string;
}
