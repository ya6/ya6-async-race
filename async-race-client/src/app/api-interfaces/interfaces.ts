 export interface BaseEntity {
	id: number | null;
  }
  
  export interface Car extends BaseEntity {
	name: string;
	color: string;
  }