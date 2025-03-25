export const VerifyRoles = (...allowedRoles) => {

    return (req, res, next) => {

        if (!req?.body.role) {
            console.log("No roles found");
            return res.sendStatus(401); 
        }

        console.log("User Role:", req.body.role);

        if (!allowedRoles.includes(req.body.role)) {
            console.log("No access allowed");
            return res.sendStatus(403);
        }
        next();
    };
};
