package com.dongpo.bmall.domain;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

/**
 * Created by AlexBob on 2015/12/16.
 */

@RepositoryRestResource(path = "dept")
public interface DeptRepository extends CrudRepository<Dept, Integer> {

    @RestResource(path = "/byGuest")
    @Query(value = "select * from v_SGroup where id in ( select deptId/100 from wholegoods where guestId = :guestId) or \n" +
            "id in (select DeptID/10000 from wholegoods where GuestID = :guestId)", nativeQuery = true)
    Iterable<Dept> findByGuestId(@Param("guestId") String guestId);
}
