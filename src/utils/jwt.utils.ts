import jwt from 'jsonwebtoken'
import { config } from '../config'

const signJWT = (id: string) => {
	const token = jwt.sign(
		{
			userId: id,
		},
		config.JWT_SECRET,
		{ expiresIn: '3d' }
	)
	return token
}

export { signJWT }