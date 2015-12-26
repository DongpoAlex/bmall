package com.dongpo.bmall.domain;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

/**
 * Created by AlexBob on 2015/12/26.
 */

@RepositoryRestResource(path = "guestCart")
public interface GuestCartRepository extends CrudRepository<GuestCart, Integer> {

    @RestResource(path = "/byGuest")
    Iterable<GuestCart> findByGuestId(@Param("guestId") String guestId);

}
