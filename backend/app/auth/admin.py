from fastapi import Depends, HTTPException

from app.auth.oauth2 import get_current_user
from app.models.user import User

def admin_only(
    current_user: User = Depends(get_current_user)
):

    if not current_user.is_admin:
        raise HTTPException(
            status_code=403,
            detail="Admins only"
        )

    return current_user