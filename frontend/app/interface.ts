export interface UserInterface {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  image_url?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RequestInterface {
  id: number
  user_id: number
  dorm_id?: number | null
  room_id?: number | null
  technician_id?: number | null
  topic: string
  description: string
  phone: string
  request_date: string  // หรือ Date ถ้านายแปลงก่อนใช้
  image_url?: string | null
  submit_image_url?: string | null
  status: "pending" | "in_progress" | "completed" | "canceled"  // ตาม enum request_status
  createdAt: string  // หรือ Date
  updatedAt: string  // หรือ Date
  user?: UserInterface
  dorm?: DormInterface
}

export interface DormInterface {
  id: number
  owner_id: number
  dorm_name: string
  location?: string | null
  phone?: string | null
  tech_code?: string | null
  line_id: string
  img_url?: string | null
  map_url: string
  createdAt: string // หรือ Date ถ้านายแปลงก่อนใช้
  updatedAt: string // หรือ Date ถ้านายแปลงก่อนใช้

}