import { Request, Response } from 'express';
import { UserService } from './user.service';
import { AuthRequest } from '../../middleware/auth';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  register = async (req: Request, res: Response) => {
    try {
      const { email, password, name, avatar } = req.body;
      const result = await this.userService.register(email, password, name, avatar);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const result = await this.userService.login(email, password);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  };

  getProfile = async (req: AuthRequest, res: Response) => {
    try {
      const user = await this.userService.getUserById(req.userId!);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  };

  getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  updateProfile = async (req: AuthRequest, res: Response) => {
    try {
      const { name, avatar } = req.body;
      const user = await this.userService.updateUser(req.userId!, { name, avatar });
      res.status(200).json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  deleteUser = async (req: AuthRequest, res: Response) => {
    try {
      await this.userService.deleteUser(req.userId!);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}
